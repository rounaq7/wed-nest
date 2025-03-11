package com.srm.events.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookingDTO {
    private Long eventId;
    private Long userId;
}

