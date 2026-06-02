package com.shop.dto;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillRequestDTO {
	@NotEmpty(message = "Bill must contain items")
    @Valid
    private List<BillItemDTO> items;
}
