<script id="react-on-php-config" type="text/javascript">
  window.config = {
    "siteTitle": "<?php bloginfo("name") ?>",
    "siteDescription": "<?php bloginfo("description") ?>",
    "appId": "",
    "buildId": "",
    "api": "<?php echo "/wp-json" . "/" . API_ENDPOINT ?>",
    "staticUri": "<?php echo get_template_directory_uri() . "/static" ?>"
  };
</script>