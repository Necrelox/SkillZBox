//
// Created by ruby on 2021-07-19.
//

#ifndef FILEMANAGER_FILE_MANAGER_H
#define FILEMANAGER_FILE_MANAGER_H

#include "file_structure.h"

enum what {EXIST = 0, READ = 4, WRITE = 2, EXEC = 1};
/** using macro for storage function*/
#define FILE_GET 2021
#define FILE_SET -2021

////////////////////////////////////////////////////////////
///
/// \date 19/07/21
///
/// \fn short file_check(const char *path, int what);
///
/// \brief check file acces Exist/Read/Write/Exec
///
/// \param[in] path you want to check
/// \param[in] what EXIST = 0, READ = 4, WRITE = 2, EXEC = 1
///
/// \return 0 if all is good else -1
///
////////////////////////////////////////////////////////////
short file_check(const char *path, int what);

////////////////////////////////////////////////////////////
///
/// \date 19/07/21
///
/// \fn file_s *file_create(const char *name);
///
/// \brief create file structure and create file
///
/// \param[in] name its name of file you can give path with name (path/name)
///
/// \return stucture file_s if all is good else NULL
///
////////////////////////////////////////////////////////////
file_s *file_create(const char *name);

////////////////////////////////////////////////////////////
///
/// \date 19/07/21
///
/// \fn file_s *file_open(const char *path);
///
/// \brief use a existing file with file manage
///
/// \param[in] path path of file
///
/// \return structure file_s else NULL
///
////////////////////////////////////////////////////////////
file_s *file_open(const char *path);

////////////////////////////////////////////////////////////
///
/// \date 19/07/21
///
/// \fn void file_struct_destroy(file_s *file, short keep);
///
/// \brief destroy the structure and can remove file if keep set to 0
///
/// \param[in] file structure
/// \param[in] keep if keep is set to 0 the file is removed
///
/// \return 0 if all is good else return -1
///
////////////////////////////////////////////////////////////
void file_struct_destroy(file_s *file, short keep);

////////////////////////////////////////////////////////////
///
/// \date 19/07/21
///
/// \fn size_t file_getsize(file_s *file);
///
/// \brief get size of file
///
/// \param[in] file structure
///
/// \return size else return -1
///
////////////////////////////////////////////////////////////
size_t file_getsize(file_s *file);

////////////////////////////////////////////////////////////
///
/// \date 19/07/21
///
/// \fn int file_insert(file_s *file, size_t pos, const char *strinsert);
///
/// \brief insert a bloc to the pos in file
///
/// \param[in] file structure
/// \param[in] pos position of bloc to insert
/// \param[in] strinsert string you want insert in file
///
/// \return 0 if all is good else return -1
///
////////////////////////////////////////////////////////////
int file_insert(file_s *file, size_t pos, const char *strinsert);

////////////////////////////////////////////////////////////
///
/// \date 19/07/21
///
/// \fn int file_append(file_s *file, const char *strappend);
///
/// \brief append a string in the file
///
/// \param[in] file structure
/// \param[in] strappend string you want append in file
///
/// \return 0 if all is good else return -1
///
////////////////////////////////////////////////////////////
int file_append(file_s *file, const char *strappend);

////////////////////////////////////////////////////////////
///
/// \date 09/08/21
///
/// \fn int file_append_bytes(file_s *file, const char *byteappend, size_t size);
///
/// \brief append bytes in the file
///
/// \param[in] file structure
/// \param[in] byteappend bytes you want append in file
/// \param[in] size number of bytes
///
/// \return 0 if all is good else return -1
///
////////////////////////////////////////////////////////////
int file_append_bytes(file_s *file, const char *byteappend, size_t size);

////////////////////////////////////////////////////////////
///
/// \date 19/07/21
///
/// \fn char *file_read(file_s *file, size_t size, size_t pos);
///
/// \brief read file, you can give size and pos
///
/// \param[in] file structure
/// \param[in] size size of bloc you want read
/// \param[in] pos where do you want get the bloc
///
/// \return bloc with \0 or NULL if catch error
///
////////////////////////////////////////////////////////////
char *file_read(file_s *file, size_t size, size_t pos);

////////////////////////////////////////////////////////////
///
/// \date 09/08/21
///
/// \fn size_t *file_search(file_s *file, size_t pos, const char *wantbyte, size_t wantbytesize);
///
/// \brief search bytes field in file
///
/// \param[in] file structure if you want set else null
/// \param[in] pos where you want search the occurence of bytes field
/// \param[in] wantbytes bytes field you want find
/// \param[in] wantbytesize size of field
///
/// \return -1 if the occurences is not find else pos of occurence
///
////////////////////////////////////////////////////////////
size_t file_search(file_s *file, size_t pos, const char *wantbyte, size_t wantbytesize);

////////////////////////////////////////////////////////////
///
/// \date 09/08/21
///
/// \fn file_s *file_storage_getset(short action, void *file);
///
/// \brief store your file structure and retrieve it anywhere and anytime
///
/// \param[in] action FILE_GET or FILE_SET
/// \param[in] file structure if you want set else null
///
/// \return NULL if you set else return file structure if struct is empty return null
///
////////////////////////////////////////////////////////////
file_s *file_storage_getset(short action, void *file);

#endif //FILEMANAGER_FILE_MANAGER_H
