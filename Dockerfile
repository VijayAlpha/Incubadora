FROM openjdk:jdk-alpine
VOLUME ["/upload"]
COPY target/horizon.jar /deployments/
ENTRYPOINT ["sh", "-c", "java -jar -Dspring.profiles.active=dev /deployments/horizon.jar"]
# CMD java -Dspring.profiles.active=dev -jar /deployments/master.jar