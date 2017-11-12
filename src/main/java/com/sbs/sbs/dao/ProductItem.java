package com.sbs.sbs.dao;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by lenovo on 2017/11/11.
 */
@Data
@Entity
@Table(name="tbl_product")
public class ProductItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="name", nullable = false)
    private String name;    //名称

    @Column(name="factory")
    private String factory; //厂家

    @Column(name="material")
    private String material;//材料

    @Column(name="type")
    private String type;    //工艺类型

    @Column(name="number")
    private Integer number; //数量

    @Column(name="to_customer_time")
    private Long toCustomerTime;//交货时间

    @Column(name="status")
    private String status; //0-进场  1-预备  2-生产   3-完成

    @Column(name="make_order")
    private Integer makeOrder; //生产排序

    @Override
    public String toString() {
        return "ProductItem{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", factory='" + factory + '\'' +
                ", material='" + material + '\'' +
                ", type='" + type + '\'' +
                ", number=" + number +
                ", toCustomerTime=" + toCustomerTime +
                ", status='" + status + '\'' +
                ", makeOrder=" + makeOrder +
                '}';
    }
}
