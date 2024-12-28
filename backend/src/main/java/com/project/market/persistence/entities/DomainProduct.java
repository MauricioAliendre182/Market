package com.project.market.persistence.entities;

import jakarta.persistence.*;

// @Entity: This annotation come across Java that this class maps a database table
@Entity
@Table(name = "productos")
public class DomainProduct {

    @Id
    //This annotation allows Java to generate the key automatically
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer idProduct;

    @Column(name = "nombre")
    private String name;

    @Column(name = "id_categoria")
    private Integer idCategory;

    @Column(name = "codigo_barras")
    private String codeBar;

    @Column(name = "precio_venta")
    private Double salePrice;

    @Column(name = "cantidad_stock")
    private Integer quantityStock;

    @Column(name = "estado")
    private Boolean state;

    @Column(name = "url")
    private String url;

    // Make the relation
    // We will not able to insert or update a category since this entity, but
    // from DomainCategory entity
    // One category for many products
    @ManyToOne
    @JoinColumn(name = "id_categoria", insertable = false, updatable = false)
    private DomainCategory category;

    public Integer getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Integer idProduct) {
        this.idProduct = idProduct;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Integer idCategory) {
        this.idCategory = idCategory;
    }

    public String getCodeBar() {
        return codeBar;
    }

    public void setCodeBar(String codeBar) {
        this.codeBar = codeBar;
    }

    public Double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Double salePrice) {
        this.salePrice = salePrice;
    }

    public Integer getQuantityStock() {
        return quantityStock;
    }

    public void setQuantityStock(Integer quantityStock) {
        this.quantityStock = quantityStock;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public DomainCategory getCategory() {
        return category;
    }

    public void setCategory(DomainCategory category) {
        this.category = category;
    }
}
