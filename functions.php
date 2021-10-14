<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once(__DIR__ . "/env.php");

// wordpress mailer
add_action("phpmailer_init", "ag_send_mail_smtp");
function ag_send_mail_smtp(PHPMailer $phpmailer) {
  if (defined("SMTP_DEBUG")) {
    $phpmailer->SMTPDebug = SMTP_DEBUG;
  }

  // server
  $phpmailer->isSMTP();
  $phpmailer->Host = SMTP_HOST;
  $phpmailer->SMTPSecure = SMTP_ENCRYPT;
  $phpmailer->Port = SMTP_PORT;
  $phpmailer->SMTPAutoTLS = SMTP_AUTO_TLS;
  
  // auth
  $phpmailer->SMTPAuth = SMTP_AUTH;
  $phpmailer->Username = SMTP_USER;
  $phpmailer->Password = SMTP_PASS;

  // header
  $phpmailer->setFrom(MAIL_FROM, mb_encode_mimeheader("送信者名: AUTH"));
  $phpmailer->addAddress(MAIL_TO, mb_encode_mimeheader("受信者名: AUTH"));
}

// theme setting
add_filter("document_title_separator", "custom_title_separator");
add_theme_support("post-thumbnails");

function custom_title_separator() {
  return "|";
}

// remove wordpress assets filters
add_filter("wp_resource_hints", "remove_dns_prefetch", 10, 2);
add_filter("the_generator", "remove_version");
add_filter("script_loader_src", "remove_version_query_from_static_assets", 15, 1);
add_filter("style_loader_src", "remove_version_query_from_static_assets", 15, 1);

function remove_dns_prefetch(array $hints, string $relation_type): array {
  if ($relation_type === "dns-prefetch") {
    return array_diff(wp_dependencies_unique_hosts(), $hints);
  }
  return $hints;
};

function remove_wordpress_version(): string {
  return "";
}

function remove_version_query_from_static_assets(string $src): string {
	$parts = explode("?ver", $src); 
	return $parts[0]; 
}

add_action("wp_enqueue_scripts", "remove_block_library_css");

function remove_block_library_css() {
  if (!is_admin()) {
    wp_dequeue_style("wp-block-library");
  }
}

remove_action("wp_head", "print_emoji_detection_script", 7);
remove_action("wp_head", "rel_canonical");
remove_action("wp_head", "rsd_link");
remove_action("wp_head", "wp_shortlink_wp_head");
remove_action("wp_head", "adjacent_posts_rel_link_wp_head", 10, 0);
remove_action("wp_head", "wlwmanifest_link");
remove_action("wp_head", "wp_generator");
remove_action("wp_head", "rest_output_link_wp_head", 10);
remove_action("wp_head", "wp_oembed_add_discovery_links", 10);
remove_action("wp_head", "wp_site_icon", 99);
remove_action("wp_head", "wp_oembed_add_discovery_links");
remove_action("wp_head", "wp_oembed_add_host_js");
remove_action("template_redirect", "rest_output_link_header", 11);
remove_action("template_redirect", "wp_shortlink_header", 11);
remove_action("wp_print_styles", "print_emoji_styles");

// static assets
add_action("wp_enqueue_scripts", "add_scripts");

function add_scripts(): void {
  $releaseDir = ENV === "development"
    ? get_template_directory_uri() . "/development"
    : get_template_directory_uri() . "/release";
  $staticDir = $releaseDir . "/static";

  try {
    $manifest = json_decode(
      mb_convert_encoding(
        file_get_contents(
          $staticDir . "/assets-manifest.json"
        ),
        "UTF8",
        "ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN"
      ),
      true
    );
    $entrypoints = $manifest["entrypoints"];
  
    $main_js = $entrypoints["main"]["assets"]["js"];
    if (is_array($main_js)) {
      foreach ($main_js as $path) {
        wp_enqueue_script($path, $staticDir . "/" . $path, array(), false, true);
      }
    }
  
    $main_css = $entrypoints["css"]["assets"]["css"];
    if (is_array($main_js)) {
      foreach ($main_css as $path) {
        wp_enqueue_style($path, $staticDir . "/" . $path, array(), false, false);
      }
    }
  } catch (Exception $err) {
    return;
  }
}

// api
add_action("rest_api_init", "add_api_endpoint");

function send_contact(WP_REST_Request $request) {
  $data = json_decode($request->get_body(), true);
  
  try {
    $headers[] = "From: Wordpress<" . MAIL_FROM . ">";
    $response = wp_mail(MAIL_TO, "contact mail sent from your site", $data["body"], $headers);
    if (!$response) {
      return new WP_REST_Response(false, 200);
    }
    return new WP_REST_Response(true, 200);
  } catch (Exception $err) {
    return new WP_REST_Response(false, 500);
  }
}

function add_api_endpoint(): void {
  register_rest_route(
    API_ENDPOINT,
    "/contact",
    array(
      "methods" => "POST",
      "callback" => "send_contact"
    )
  );
}
