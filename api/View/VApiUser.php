<?php
if ($this->getErrorFind() === 1)
    echo $this->getError();
else
    echo json_encode("vue user api");
?>


<form action="/api/84D00486080BAF8545BC295641535E6C/user" method="post">
    <input type="hidden" name="Create" value=''/>
    <input type="text" name="username" placeholder="name">
    <input type="text" name="email" placeholder="email">
    <input type="text" name="password" placeholder="password">
    <input type="number" name="roles" placeholder="role">
    <input type="submit" value="submit">
</form>


