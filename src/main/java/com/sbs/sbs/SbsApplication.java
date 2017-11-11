package com.sbs.sbs;

import com.sbs.sbs.dao.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class SbsApplication {
	@Autowired
	private ProductRepository repository;

	@RequestMapping({"/","/login"})
	public String login(Model model){
		return "login";
	}


	public static void main(String[] args) {
		SpringApplication.run(SbsApplication.class, args);
	}
}
