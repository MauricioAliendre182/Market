package com.project.market.persistence.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "categorias")
public class DomainCategory {
    @Id
    @Column(name = "id_categoria")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCategory;

    @Column(name = "descripcion")
    private String description;

    @Column(name = "estado")
    private Boolean active;

    // One category for many products
    @OneToMany(mappedBy = "category")
    private List<DomainProduct> products;

    public Integer getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Integer id) {
        this.idCategory = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<DomainProduct> getProducts() {
        return products;
    }

    public void setProducts(List<DomainProduct> products) {
        this.products = products;
    }
}
