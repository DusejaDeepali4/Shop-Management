package com.shop.poojo;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long pid;
private String productName;
private String brand;
private String size;
private Double price;
private String unit;
@ManyToOne
@JoinColumn(name="category_id")
private Category category;

}
