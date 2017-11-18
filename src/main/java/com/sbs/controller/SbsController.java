package com.sbs.controller;

import com.google.common.base.Joiner;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.sbs.Utils;
import com.sbs.dao.ProductItem;
import com.sbs.dao.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by lenovo on 2017/11/12.
 */
@RestController
public class SbsController {
    private final static Logger LOGGER = LoggerFactory.getLogger(SbsController.class);

    @Autowired
    private ProductRepository repository;

    @RequestMapping(value = "/rest/products", method = RequestMethod.GET)
    public List<ProductItem> queryProducts(@RequestParam String status){
        LOGGER.info("queryProducts begin...status is {}", status);

        if (Strings.isNullOrEmpty(status)){
            return repository.findAll();
        }
        return repository.findByStatus(status);
    }

    @RequestMapping(value = "/rest/product", method = {RequestMethod.PUT})
    public String addProduct(@RequestBody ProductItem product){
        LOGGER.info("addProduct begin...product is {}", product);

        List<String> checkProduct = checkProduct(product);
        if (checkProduct.isEmpty()){

            product.setStatus("0");
            product.setCreateTime(Utils.getCurrentTime());

            ProductItem result = repository.save(product);
            if (result != null){
                return "200";
            }
        }
        return Joiner.on('\n').join(checkProduct);
    }

    @RequestMapping(value = "/rest/product", method = {RequestMethod.POST})
    public String modifyProductSingle(@RequestBody ProductItem product){
        LOGGER.info("addProduct begin...product is {}", product);

        List<String> checkProduct = checkProduct(product);
        if (checkProduct.isEmpty()){
            ProductItem query = repository.findOne(product.getId());
            if (query == null){
                return "产品信息不存在!";
            }
            product.setCreateTime(query.getCreateTime());
            ProductItem result = repository.save(product);

            if (result == null){
                return "修改失败,请刷新后重试.";
            }
            return "200";
        }
        return Joiner.on('\n').join(checkProduct);
    }

    private List<String> checkProduct(ProductItem product) {
        List<String> check = Lists.newArrayList();
        if (Strings.isNullOrEmpty(product.getName())){
            check.add("名称不能为空");
        }
        if (Strings.isNullOrEmpty(product.getFactory())){
            check.add("厂家信息不能为空");
        }
        if (Strings.isNullOrEmpty(product.getMaterial())){
            check.add("材料信息不能为空");
        }
        if (Strings.isNullOrEmpty(product.getType())){
            check.add("工艺类型信息不能为空");
        }
        if (product.getNumber() == null || product.getNumber() < 1){
            check.add("数量不能为空");
        }
        if (!Utils.checkDateInput(product.getToCustomerTime())){
            check.add("交货时间不能为空或者早于当前时间");
        }
        //TODO
        return check;
    }

    @RequestMapping(value = "/rest/products", method = {RequestMethod.POST})
    public String modifyProduct(@RequestBody List<ProductItem> products){
        LOGGER.info("modifyProduct begin...product is {}", products);

        List<Integer> failedIds = Lists.newArrayList();
        for (ProductItem product : products) {
            ProductItem query = repository.findOne(product.getId());
            if (query == null){
                failedIds.add(product.getId());
                continue;
            }
            product.setCreateTime(query.getCreateTime());
            ProductItem result = repository.save(product);
            if (result == null){
                failedIds.add(product.getId());
            }
        }

        if (failedIds.isEmpty()){
            return "200";
        }
        LOGGER.error("modify failed ids: {}",failedIds);
        return "400";
    }

    @RequestMapping(value = "/rest/product", method = {RequestMethod.DELETE})
    public String deleteProduct(@RequestBody ProductItem product){
        LOGGER.info("deleteProduct begin...product is {}", product);

        ProductItem result = repository.findOne(product.getId());
        if (result != null){
            repository.delete(result);
            return "200";
        }
        return "400";
    }
}
