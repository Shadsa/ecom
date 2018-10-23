package com.mycompany.myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.QRCode.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Spectacle.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Spectacle.class.getName() + ".ouvreurs", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Spectacle.class.getName() + ".notes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Reservation.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Reservation.class.getName() + ".notes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Responsable.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Responsable.class.getName() + ".notes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Salle.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Salle.class.getName() + ".spectacles", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Salle.class.getName() + ".notes", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Ouvreur.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Ouvreur.class.getName() + ".spectacles", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Note.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Note.class.getName() + ".reservations", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Note.class.getName() + ".spectacles", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Note.class.getName() + ".salles", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
