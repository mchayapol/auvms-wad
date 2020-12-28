<?php
$file = fopen("provinces.csv","r");
while(! feof($file)) {
  $line = fgetcsv($file);

  }
fclose($file);
?>