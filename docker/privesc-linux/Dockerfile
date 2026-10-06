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
RUN echo 'root:tryhackswigger123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Create regular user
RUN useradd -m -s /bin/bash tryhackswigger
RUN echo 'tryhackswigger:tryhackswigger123' | chpasswd

# Create SUID binary vulnerability
COPY suid_vuln.c /tmp/suid_vuln.c
RUN gcc /tmp/suid_vuln.c -o /usr/local/bin/suid_vuln
RUN chmod 4755 /usr/local/bin/suid_vuln
RUN rm /tmp/suid_vuln.c

# Create misconfigured cron job
RUN echo '* * * * * root cat /root/flag.txt > /tmp/cron_flag 2>/dev/null' >> /etc/crontab

# Make /etc/passwd writable (world-writable)
RUN chmod 666 /etc/passwd

# Configure weak sudo rules
RUN echo 'tryhackswigger ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

# Create flag in /root
RUN echo 'tryhackswigger{privesc_linux_root_flag}' > /root/flag.txt
RUN chmod 600 /root/flag.txt

# Add decoy flags to mislead
RUN echo 'tryhackswigger{fake_flag_1}' > /tmp/fake_flag.txt
RUN echo 'tryhackswigger{decoy_flag}' > /home/tryhackswigger/.secret
RUN echo 'tryhackswigger{not_the_flag}' > /etc/decoy

# Expose SSH and ttyd ports
EXPOSE 22 7681

# Start services
CMD bash -c "service ssh start && ttyd -p 7681 --writable bash & tail -f /dev/null"
