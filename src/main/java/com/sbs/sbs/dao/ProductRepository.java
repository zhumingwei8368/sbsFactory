package com.sbs.sbs.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by lenovo on 2017/11/11.
 */
@Transactional
public interface ProductRepository extends JpaRepository<ProductItem, Integer> {
    public List<ProductItem> findByStatus(String status);
}
