    package com.srm.events.dto;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class SelectionDTO {
        private Long id;
        private String role;
        private Integer budget;
        private Long customerId;  // This field will hold the customerId
    }
