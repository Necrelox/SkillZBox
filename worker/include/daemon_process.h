/*
** Created by ruby on 2021-11-20
** File : Daemon_Process
** description:
** Daemon_Process
*/
#ifndef WORKER_DAEMON_PROCESS_H
#define WORKER_DAEMON_PROCESS_H

#define PARENT_DIE -2

////////////////////////////////////////////////////////////
///
/// \date 20/11/21
///
/// \fn int process_daemon_generate_token(int frequency_token);
///
/// \brief Create process deamon for generate a token in file each frequency.
///
/// \param[in] frequency_token each frequency we generate a token
///
/// \return EXIT_SUCCESS if all is good else EXIT_FAILURE
///
////////////////////////////////////////////////////////////
int process_daemon_generate_token(int frequency_token);

#endif //WORKER_DAEMON_PROCESS_H
