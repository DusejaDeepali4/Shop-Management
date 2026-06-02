package com.shop.dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.poojo.BillItem;
public interface BillItemDao extends JpaRepository<BillItem,Long>{

}
