package com.project.market.persistence.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "compras_productos")
public class DomainPurchaseProduct {

    // This annotation is for composed id
    @EmbeddedId
    private PurchaseProductPK id;

    @Column(name = "cantidad")
    private Integer quantity;

    private Double total;

    @Column(name = "estado")
    private Boolean state;

    // At the moment to store the Purchase on cascade it will know
    // which primary key belongs every product presents in a purchase
    @ManyToOne
    @MapsId("idPurchase")
    @JoinColumn(name = "id_compra", updatable = false, insertable = false)
    private DomainPurchase purchase;

    @ManyToOne
    @JoinColumn(name = "id_producto", updatable = false, insertable = false)
    private DomainProduct product;

    public PurchaseProductPK getId() {
        return id;
    }

    public void setId(PurchaseProductPK id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public DomainPurchase getPurchase() {
        return purchase;
    }

    public void setPurchase(DomainPurchase purchase) {
        this.purchase = purchase;
    }

    public DomainProduct getProduct() {
        return product;
    }

    public void setProduct(DomainProduct product) {
        this.product = product;
    }
}
