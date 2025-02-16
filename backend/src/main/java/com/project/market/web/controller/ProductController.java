package com.project.market.web.controller;

import com.project.market.domain.dto.Product;
import com.project.market.domain.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Products section")
@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping()
    @PreAuthorize("permitAll")
    @Operation(summary = "Get all supermarket products")
    @ApiResponse(responseCode = "200", description = "OK")
    public ResponseEntity<List<Product>> getAll(
            @Parameter(description = "The offset to start getting the products", required = false, example = "1")
            @RequestParam(defaultValue = "0") int offset,
            @Parameter(description = "The limit of the registers that are recovered", required = false, example = "9")
            @RequestParam(defaultValue = "10") int limit
    ) {
        return new ResponseEntity<>(productService.getAll(offset, limit), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    @Operation(summary = "Search a product with ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<Product> getProduct(
            @Parameter(description = "The id of the product", required = true, example = "7")
            @PathVariable("id") int productId
    ) {
        return productService.getProduct(productId)
                .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/category/{categoryId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    @Operation(summary = "Search a product by the category ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<List<Product>> getByCategory(
            @Parameter(description = "The id of the category", required = true, example = "3")
            @PathVariable("categoryId") int categoryId,
            @Parameter(description = "The offset to start getting the products", required = false, example = "1")
            @RequestParam(defaultValue = "0") int offset,
            @Parameter(description = "The limit of the registers that are recovered", required = false, example = "9")
            @RequestParam(defaultValue = "10") int limit
    ) {
        List<Product> products = productService.getByCategory(categoryId, offset, limit).orElse(null);

        return products != null && !products.isEmpty() ?
                new ResponseEntity<>(products, HttpStatus.OK)
                : new ResponseEntity<List<Product>>(HttpStatus.NOT_FOUND);
    }
//        return productService.getByCategory(categoryId)
//                .map(products -> new ResponseEntity<>(products, HttpStatus.OK))
//                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a product")
    @ApiResponse(responseCode = "201", description = "Created")
    public ResponseEntity<Product> save(
            @RequestBody Product product
    ) {
        return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a product")
    @ApiResponse(responseCode = "200", description = "Update")
    public ResponseEntity<Product> update(
            @Parameter(description = "The id of the product", required = true, example = "7")
            @PathVariable("id") int productId,
            @RequestBody Product product
    ) {
        return productService.getProduct(productId)
                .map(productUpdate -> new ResponseEntity<>(productService.update(product, productUpdate, productId), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a product by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity delete(
           @Parameter(description = "The id of the product", required = true, example = "7")
           @PathVariable("id") int productId
    ) {
        if (productService.delete(productId)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
