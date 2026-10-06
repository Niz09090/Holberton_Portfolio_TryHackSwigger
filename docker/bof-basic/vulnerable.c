#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void vulnerable_function(char *input) {
    char buffer[64];
    char secret[] = "tryhackswigger{bof_exploit_success}";
    
    // VULNERABLE: No bounds checking - buffer overflow
    strcpy(buffer, input);
    
    printf("Processing input...\n");
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <input>\n", argv[0]);
        return 1;
    }
    
    printf("=== Data Processor ===\n");
    printf("Processing data...\n\n");
    
    vulnerable_function(argv[1]);
    
    printf("Data processed successfully.\n");
    
    return 0;
}
