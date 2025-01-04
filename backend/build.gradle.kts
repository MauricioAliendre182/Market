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
	runtimeOnly("org.postgresql:postgresql:42.6.0")

	// MapStruct for DTO mappings
	implementation("org.mapstruct:mapstruct:1.5.6.Final")
	annotationProcessor("org.mapstruct:mapstruct-processor:1.5.6.Final")

	// JUnit for testing
	testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
