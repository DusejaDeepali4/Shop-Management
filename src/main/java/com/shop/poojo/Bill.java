package com.shop.poojo;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="bills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
private LocalDateTime billDate;
private Double totalAmount;
@OneToMany(cascade=CascadeType.ALL)
@JoinColumn(name="bill_id")
private List<BillItem> items;
	
}
