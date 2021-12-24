<?php
if ($this->getErrorFind() === 1)
    echo $this->getError();
else
    echo json_encode("vue user api");
?>

