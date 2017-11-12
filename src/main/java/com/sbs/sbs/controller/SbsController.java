package com.sbs.sbs.controller;

import com.google.common.base.Strings;
import com.sbs.sbs.dao.ProductItem;
import com.sbs.sbs.dao.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by lenovo on 2017/11/12.
 */
@RestController
public class SbsController {
    @Autowired
    private ProductRepository repository;

    @RequestMapping(value = "/rest/products", method = RequestMethod.GET)
    public List<ProductItem> queryProducts(@RequestParam String status){
        if (Strings.isNullOrEmpty(status)){
            return repository.findAll();
        }
        return repository.findByStatus(status);
    }

    @RequestMapping(value = "/rest/products", method = {RequestMethod.PUT,RequestMethod.POST})
    public String addProduct(@RequestBody ProductItem product){
        ProductItem result = repository.save(product);
        if (result != null){
            return "200";
        }
        return "400";
    }

    @RequestMapping(value = "/rest/products", method = {RequestMethod.DELETE})
    public String deleteProduct(@RequestBody ProductItem product){
        ProductItem result = repository.findOne(product.getId());
        if (result != null){
            repository.delete(result);
            return "200";
        }
        return "400";
    }
}
