<?php
if ($this->getErrorFind() === 1)
    echo $this->getError();
else
    echo json_encode("vue user api");
?>


<form action="/api/600623AFEDFD2B037D8C375B3CE8C323/user" method="post">
    <input type="hidden" name="Create" value=''/>
    <input type="text" name="username" placeholder="name">
    <input type="text" name="email" placeholder="email">
    <input type="text" name="password" placeholder="password">
    <input type="number" name="role" placeholder="role">
    <input type="submit" value="submit">
</form>


