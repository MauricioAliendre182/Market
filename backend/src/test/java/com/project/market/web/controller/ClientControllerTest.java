package com.project.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.market.domain.dto.Client;
import com.project.market.domain.service.ClientService;
import com.project.market.utils.MapperMethods;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ClientControllerTest {
    private final static String BASE_URL = "/clients";

    private MockMvc mockMvc;

    @Mock
    private ClientService clientService;

    @InjectMocks
    private ClientController clientController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // This method only initializes the controller being tested without loading the full Spring context.
        // It makes tests faster and avoids unnecessary dependencies.
        mockMvc = MockMvcBuilders.standaloneSetup(clientController).build();
    }

    @Test
    void getAllClients() throws Exception {
        when(clientService.getAll()).thenReturn(List.of(buildClient()));

        MvcResult mockMvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL)
//                        .queryParam("enablePagination", "false")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                )
                .andReturn();
        assertEquals(200, mockMvcResult.getResponse().getStatus());
    }

    @Test
    void getClient() throws Exception {
        Client client = buildClient();
        when(clientService.getClient("7343167")).thenReturn(Optional.of(client));

        MvcResult mvcResultGet = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/7343167")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        assertEquals(200, mvcResultGet.getResponse().getStatus());
        assertTrue(mvcResultGet.getResponse().getContentAsString().contains("Mauricio"));
    }

    @Test
    void saveAClient() throws Exception {
        Client client = buildClient();
        // we mock the behavior of real client service.
        when(clientService.save(any(Client.class))).thenReturn(client);

        // we call the controller’s /save endpoint, which in turn calls clientService.save(client), and Mockito returns the predefined client.
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/save")
                        .content(MapperMethods.mapToJson(client))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        assertEquals(201, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("7343167"));
    }

    @Test
    void getAClientWithError() throws Exception {
        when(clientService.getClient("100")).thenReturn(Optional.empty());

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/100")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @Test
    void deleteAClient() throws Exception {
        // doNothing() tells Mockito to do nothing when the delete("7343167") method is called.
        // This is useful because we don’t want to actually delete anything from the database
        // during the test. We're just mocking the behavior to simulate the method being called.
        // If the method you're mocking is void (i.e., it doesn’t return anything), you use doNothing() to avoid exceptions
        when(clientService.delete("7343167")).thenReturn(true);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete(BASE_URL + "/delete/7343167"))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
        // This line verifies that the delete() method of clientService was called exactly once with the parameter "7343167".
        verify(clientService, times(1)).delete("7343167");
    }

    private Client buildClient() {
        Client client = new Client();
        client.setClientId("7343167");
        client.setFirstName("Mauricio");
        client.setLastName("Aliendre");
        client.setAddress("Sucre y Petot");
        client.setEmail("Maps@hotmail.com");
        client.setCellPhone(60408425L);

        return client;
    }
}