package com.shop.poojo;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="bill_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillItem {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
private Long productId;
private String productName;
private Integer quantity;
private Double price;
private Double amount;
}
