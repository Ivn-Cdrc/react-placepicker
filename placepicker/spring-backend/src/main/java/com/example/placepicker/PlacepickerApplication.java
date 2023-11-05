package com.example.placepicker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import com.example.config.MvcConfig;

@SpringBootApplication // same as @Configuration @EnableAutoConfiguration @ComponentScan
@Import({ MvcConfig.class })
public class PlacepickerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlacepickerApplication.class, args);
	}
}
