package com.shop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shop.dto.BillRequestDTO;
import com.shop.poojo.Bill;
import com.shop.service.BillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    private final BillService service;

    public BillController(BillService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Bill> createBill(
            @Valid @RequestBody BillRequestDTO request) {

        return ResponseEntity.ok(
                service.createBill(request));
    }
}
