package com.project.market.domain.service;

import com.project.market.domain.dto.Client;
import com.project.market.domain.repository.ClientRepositoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepositoryDTO clientRepositoryDTO;

    public List<Client> getAll() {
        return clientRepositoryDTO.getAll();
    }

    public Optional<Client> getClient(String clientId) {
        return clientRepositoryDTO.getClient(clientId);
    }

    public Optional<Client> getAClientByEmail(String email) {
        return clientRepositoryDTO.getAClientByEmail(email);
    }

    public Client save(Client client) {
        return clientRepositoryDTO.save(client);
    }

    public boolean delete(String clientId) {
        return getClient(clientId).map(product -> {
            clientRepositoryDTO.delete(clientId);
            return true;
        }).orElse(false);
    }
}
