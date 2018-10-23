package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.QRCode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the QRCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QRCodeRepository extends JpaRepository<QRCode, Long> {

    @Query("select qr_code from QRCode qr_code where qr_code.user.login = ?#{principal.username}")
    List<QRCode> findByUserIsCurrentUser();

}
