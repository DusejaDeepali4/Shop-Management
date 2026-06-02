package com.shop.dto;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
public class BillItemResponseDTO {
	 private String productName;

	    private Integer quantity;

	    private Double price;

	    private Double amount;
}
