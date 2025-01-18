plugins {
	java
	jacoco
	id("org.springframework.boot") version "3.4.0"
	id("io.spring.dependency-management") version "1.1.3"
}

group = "com.project"
version = "1.0"


jacoco {
	toolVersion = "0.8.10"
}

java {
	sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

repositories {
	mavenCentral()
}

tasks.jacocoTestReport {
	reports {
		xml.required.set(false)
		csv.required.set(false)
		html.required.set(true)
		html.outputLocation.set(layout.buildDirectory.dir(System.getProperty("user.dir") + File.separator + "jacocoHtml"))
	}
}

// Create a custom configuration for the Mockito agent
val mockitoAgent = configurations.create("mockitoAgent")

dependencies {
	// Spring Boot dependencies (version managed by BOM)
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security")
	testImplementation("org.springframework.boot:spring-boot-starter-test")

	// SpringDoc for OpenAPI
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0")

	// JJWT (JSON Web Tokens)
	implementation("io.jsonwebtoken:jjwt-api:0.12.3")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.3")
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.3")

	// PostgreSQL Database Driver
	runtimeOnly("org.postgresql:postgresql:42.7.2")

	// MapStruct for DTO mappings
	implementation("org.mapstruct:mapstruct:1.5.5.Final")
	annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")

	// JUnit for testing
	testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")

	// Mockito
	testImplementation("org.mockito:mockito-core:5.14.2")

	// Add Mockito agent for Java 21+ inline mocking
	// reference: https://javadoc.io/doc/org.mockito/mockito-core/5.14.2/org/mockito/Mockito.html
	mockitoAgent("org.mockito:mockito-core:5.14.2")  { isTransitive = false }
}

tasks.withType<Test> {
	useJUnitPlatform()

	// This tells the JVM to load the mockito-inline agent during the test run.
	// This will handle the inline mocking feature, resolving the warning about self-attaching.
	jvmArgs("-javaagent:${mockitoAgent.asPath}")
}
