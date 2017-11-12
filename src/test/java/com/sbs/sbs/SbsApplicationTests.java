package com.sbs.sbs;

import com.sbs.sbs.dao.ProductItem;
import com.sbs.sbs.dao.ProductRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SbsApplicationTests {
	@Autowired
	private ProductRepository repository;
	
	@Test
	public void contextLoads() {
	}

	@Test
	public void test_findByStatus() throws Exception {
		List<ProductItem> items = repository.findAll();
		for (ProductItem item : items) {
			System.out.println(item);
		}

		items = repository.findByStatus("1");
	}
}
