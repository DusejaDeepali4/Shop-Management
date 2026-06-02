package com.shop.poojo;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Category {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
@Column(name="category_name")
private String name;
}
