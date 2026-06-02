package com.shop.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import com.shop.dao.BillDao;
import com.shop.dao.ProductDao;
import com.shop.dto.BillItemDTO;
import com.shop.dto.BillRequestDTO;
import com.shop.exception.InsufficientStockException;
import com.shop.exception.ResourceNotFoundException;
import com.shop.poojo.Bill;
import com.shop.poojo.BillItem;
import com.shop.poojo.Product;

@Service
@Transactional
public class BillServiceImpl implements BillService{

	private final ProductDao pdao;
	private final BillDao bdao;
	public BillServiceImpl(ProductDao pdao,BillDao bdao) {
		this.pdao=pdao;
		this.bdao=bdao;
	}
	@Override
	public Bill createBill(BillRequestDTO request) {
		Bill bill = new Bill();

        List<BillItem> billItems =
                new ArrayList<>();

        double total = 0;

        for (BillItemDTO dto :
                request.getItems()) {

            Product product =
                    pdao.findById(
                                    dto.getProductId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Product not found"));

            if (product.getStock()
                    < dto.getQuantity()) {

                throw new InsufficientStockException(
                        "Insufficient stock for "
                                + product.getProductName());
            }

            BillItem item = new BillItem();

            item.setProductId(product.getPid());
            item.setProductName(
                    product.getProductName());

            item.setQuantity(
                    dto.getQuantity());

            item.setPrice(
                    product.getPrice());

            double amount =
                    product.getPrice()
                            * dto.getQuantity();

            item.setAmount(amount);

            total += amount;

            product.setStock(
                    product.getStock()
                            - dto.getQuantity());

            pdao.save(product);

            billItems.add(item);
        }

        bill.setBillDate(
                LocalDateTime.now());

        bill.setTotalAmount(total);

        bill.setItems(billItems);

        return bdao.save(bill);
	}

}
