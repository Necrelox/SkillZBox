/*
** Created by ruby on 2021-11-20
** File : Daemon_Process
** description:
** Daemon_Process
*/

#include "../include/file_manager.h"
#include "../include/file_structure.h"
#include <openssl/rand.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <string.h>
#include <sys/syslog.h>

static int create_daemon(void)
{
    pid_t pid = fork();
    if (pid < 0)
        exit (EXIT_FAILURE);
    if (pid > 0)
        exit (EXIT_SUCCESS);


    if (setsid() < 0)
        exit (EXIT_FAILURE);

    pid = fork();
    if (pid < 0)
        exit(EXIT_FAILURE);
    if (pid > 0)
        exit(EXIT_SUCCESS);

    if (chdir("/") < 0)
        exit (EXIT_FAILURE);
    umask(777);

    for (int fd = sysconf(_SC_OPEN_MAX); fd >= 0; fd--)
        close (fd);

    openlog ("token_daemon", LOG_PID, LOG_DAEMON);
    return EXIT_SUCCESS;
}

static char *bin2hex(const unsigned char *bin, size_t len)
{
    if (bin == NULL || len == 0)
        return NULL;
    char *out = malloc(len*2+1);
    if (!out)
        return NULL;

    for (size_t i = 0; i < len; ++i) {
        out[i*2]   = "0123456789ABCDEF"[bin[i] >> 4];
        out[i*2+1] = "0123456789ABCDEF"[bin[i] & 0x0F];
    }
    out[len*2] = '\0';
    return out;
}

static char *gen_token(void)
{
    unsigned char token_byte[16];
    if(RAND_bytes(token_byte, sizeof(token_byte)) != 1)
        return NULL;
    return bin2hex(token_byte, sizeof(token_byte));
}

static int generate_and_write_new_token(int frequency_token)
{
    file_s *ftoken = NULL;

    const char *path = "home/ruby/Documents/PHP/Sandbox/TEMP/api/ech/token.txt";

    if (access(path, F_OK ) == 0)
        remove(path);

    while (1) {
        if (ftoken && file_check(path, EXIST) == 0) {
            file_struct_destroy(ftoken, 0);
            ftoken = NULL;
        }
        if (ftoken == NULL && file_check(path, EXIST) < 0)
            ftoken = file_create(path);
        char *token = gen_token();
        if (token == NULL)
            return EXIT_FAILURE;
        if (file_append(ftoken, token) < 0)
            return EXIT_FAILURE;
        sleep(frequency_token);
        if (token)
            free(token);
    }
    if (ftoken && file_check(path, EXIST) == 0)
        file_struct_destroy(ftoken, 1);
    return EXIT_SUCCESS;
}

int process_daemon_generate_token(int frequency_token)
{
    struct stat st;

    if (stat("/home/ruby/Documents/PHP/Sandbox/TEMP/api/ech", &st) == -1)
        mkdir("/home/ruby/Documents/PHP/Sandbox/TEMP/api/ech", 0777);


    if (create_daemon() == EXIT_SUCCESS) {
        if (generate_and_write_new_token(frequency_token) == EXIT_FAILURE)
            return EXIT_FAILURE;
        syslog (LOG_NOTICE, "token daemon terminated.");
        closelog();
    }
    return EXIT_FAILURE;
}
