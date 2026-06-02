package com.shop.service;
import com.shop.poojo.Bill;
import com.shop.dto.BillRequestDTO;
public interface BillService {
	Bill createBill(BillRequestDTO request);
}
