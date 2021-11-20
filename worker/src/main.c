#include "../include/daemon_process.h"
#include <stdio.h>
#include <stdlib.h>

int verif_if_number(const char *str)
{
    int i = 0;
    while (str[i] && str[i] >= 48 && str[i] <= 57)
        ++i;
    return str[i] != '\0' ? 0 : 1;
}

int print_help()
{
    printf("Usage: ./workerToken [frequency_generate_token]\n Default: 60 secondes");
    return 0;
}

int main(int ac, char **av)
{
    int frequency_token = 60;
    printf("ac : %d\n", ac);
    if (ac == 2) {
        if (verif_if_number(av[1]))
            frequency_token = atoi(av[1]);
    } else if (ac > 2)
        return print_help();;
    printf("frequency_token : %d\n", frequency_token);
    /*---Daemon code---*/

    return process_daemon_generate_token(frequency_token);
    /*-----------------*/
}
