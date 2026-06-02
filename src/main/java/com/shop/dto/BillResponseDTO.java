package com.shop.dto;
import java.time.LocalDateTime;
import java.util.List;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillResponseDTO {
	private Long billId;

    private LocalDateTime billDate;

    private Double totalAmount;

    private List<BillItemResponseDTO> items;
}
