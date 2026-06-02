package com.shop.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
private Long id;
@NotBlank(message = "Product name is required")
private String productName;

private String brand;

private String size;

private String unit;

@NotNull(message = "Price is required")
@Positive(message = "Price must be greater than zero")
private Double price;

@NotNull(message = "Stock is required")
@Min(value = 0, message = "Stock cannot be negative")
private Integer stock;

@NotNull(message = "Category is required")
private Long categoryId;
}
