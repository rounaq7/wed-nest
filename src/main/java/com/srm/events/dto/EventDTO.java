package com.srm.events.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EventDTO {
    private String name;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String description;
}
