package com.sbs;

import com.sbs.dao.ProductItem;
import com.sbs.dao.ProductRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
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
		Sort sort = new Sort(Sort.Direction.DESC, "createTime");
		List<ProductItem> items = repository.findAll(sort);
		for (ProductItem item : items) {
			System.out.println(item);
		}

		items = repository.findByStatus("1");
		System.out.println(items);
	}
}
