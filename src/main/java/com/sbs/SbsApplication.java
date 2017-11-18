package com.sbs;

import com.sbs.dao.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Controller
@SpringBootApplication
@Configuration
public class SbsApplication extends WebMvcConfigurerAdapter {
	private final static Logger LOGGER = LoggerFactory.getLogger(SbsApplication.class);

	@RequestMapping({"/","/index"})
	public String index(Model model){
		return "index";
	}
	@RequestMapping({"/","/operation"})
	public String operation(Model model){
		return "operation";
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("*")
				.allowCredentials(true)
				.allowedMethods("GET", "POST", "DELETE", "PUT")
				.maxAge(3600);
	}

	public static void main(String[] args) {
		SpringApplication.run(SbsApplication.class, args);
		LOGGER.info("sbs system start successfully...");
	}
}
