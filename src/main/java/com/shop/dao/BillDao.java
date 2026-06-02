package com.shop.dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.poojo.Bill;
public interface BillDao extends JpaRepository<Bill,Long>{

}
