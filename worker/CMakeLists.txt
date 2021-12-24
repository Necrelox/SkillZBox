cmake_minimum_required(VERSION 3.20)
project(workerToken C)

set(CMAKE_C_STANDARD 99)
add_compile_options(-Wall -Wextra -pedantic -Werror -O3)

add_executable(workerToken src/main.c src/daemon_process.c include/daemon_process.h include/file_manager.h
        include/file_structure.h)

target_link_libraries(workerToken "/home/ruby/Documents/PHP/Sandbox/TEMP/worker/lib/libFileManager.a")
target_link_libraries(workerToken ssl crypto)
