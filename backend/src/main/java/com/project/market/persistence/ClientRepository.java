package com.project.market.persistence;

import com.project.market.domain.dto.Client;
import com.project.market.domain.repository.ClientRepositoryDTO;
import com.project.market.persistence.crud.ClientCrudRepository;
import com.project.market.persistence.entities.DomainClient;
import com.project.market.persistence.mapper.ClientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClientRepository implements ClientRepositoryDTO {
    @Autowired
    private ClientCrudRepository clientCrudRepository;

    @Autowired
    private ClientMapper mapper;

    @Override
    public List<Client> getAll() {
        List<DomainClient> domainClients = (List<DomainClient>) clientCrudRepository.findAll();
        return mapper.toClients(domainClients);
    }

    @Override
    public Optional<Client> getClient(String clientId) {
        return clientCrudRepository.findById(clientId).map(client -> mapper.toClient(client));
    }

    @Override
    public Client save(Client client) {
        DomainClient domainClient = mapper.toDomainClient(client);
        return mapper.toClient(clientCrudRepository.save(domainClient));
    }

    @Override
    public void delete(String clientId) {
        clientCrudRepository.deleteById(clientId);
    }
}
