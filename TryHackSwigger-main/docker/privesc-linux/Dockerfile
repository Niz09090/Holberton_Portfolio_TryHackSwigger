FROM ubuntu:22.04

# Install required packages
RUN apt-get update && apt-get install -y \
    openssh-server \
    sudo \
    curl \
    ttyd \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Setup SSH
RUN mkdir /var/run/sshd
RUN echo 'root:hackforge123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Create regular user
RUN useradd -m -s /bin/bash hackforge
RUN echo 'hackforge:hackforge123' | chpasswd

# Create SUID binary vulnerability
COPY suid_vuln.c /tmp/suid_vuln.c
RUN gcc /tmp/suid_vuln.c -o /usr/local/bin/suid_vuln
RUN chmod 4755 /usr/local/bin/suid_vuln
RUN rm /tmp/suid_vuln.c

# Create misconfigured cron job
RUN echo '* * * * * root echo "hackforge{privesc_cron_flag}" > /tmp/cron_flag' >> /etc/crontab

# Make /etc/passwd writable (world-writable)
RUN chmod 666 /etc/passwd

# Configure weak sudo rules
RUN echo 'hackforge ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

# Create flag in /root
RUN echo 'hackforge{privesc_linux_root_flag}' > /root/flag.txt
RUN chmod 600 /root/flag.txt

# Expose SSH and ttyd ports
EXPOSE 22 7681

# Start services
CMD service ssh start && ttyd -p 7681 bash
