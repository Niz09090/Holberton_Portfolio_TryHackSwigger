#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void vulnerable_function(char *input) {
    char buffer[64];
    
    // VULNERABLE: No bounds checking - buffer overflow
    strcpy(buffer, input);
    
    printf("Input received: %s\n", buffer);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <input>\n", argv[0]);
        printf("Try to overflow the buffer to get the flag!\n");
        return 1;
    }
    
    printf("=== Buffer Overflow Challenge ===\n");
    printf("Buffer size: 64 bytes\n");
    printf("Your input: %s\n", argv[1]);
    printf("Input length: %lu bytes\n\n", strlen(argv[1]));
    
    vulnerable_function(argv[1]);
    
    return 0;
}
