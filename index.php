<!DOCTYPE html>
<html <?= language_attributes(); ?>>
<head>
  <?php get_header(); ?>
</head>

<body>
<?php

wp_body_open();
get_template_part("templates/noscript");

?>

<div data-application="true" aria-label="App"></div>

<?php

get_template_part("templates/config");
get_footer();

?>
</body>

</html>