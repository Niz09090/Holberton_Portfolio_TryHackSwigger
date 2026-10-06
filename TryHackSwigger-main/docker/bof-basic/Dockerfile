FROM ubuntu:22.04

# Install required packages
RUN apt-get update && apt-get install -y \
    gcc \
    gdb \
    gdbserver \
    python3 \
    python3-pip \
    curl \
    ttyd \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install pwndbg
RUN cd /opt && \
    git clone https://github.com/pwndbg/pwndbg && \
    cd pwndbg && \
    ./setup.sh

# Copy vulnerable program
COPY vulnerable.c /tmp/vulnerable.c

# Compile with no stack protection
RUN gcc -fno-stack-protector -no-pie -z execstack -o /vulnerable /tmp/vulnerable.c
RUN rm /tmp/vulnerable.c

# Create flag
RUN echo 'hackforge{bof_exploit_success}' > /root/flag.txt
RUN chmod 600 /root/flag.txt

# Create a script that reads the flag if exploited correctly
RUN echo '#!/bin/bash\nif [ "$1" = "hackforge{bof_exploit_success}" ]; then\n    cat /root/flag.txt\nelse\n    echo "Wrong flag!"\nfi' > /tmp/check_flag.sh
RUN chmod +x /tmp/check_flag.sh

# Expose ttyd port
EXPOSE 7681

# Start ttyd
CMD ttyd -p 7681 bash
